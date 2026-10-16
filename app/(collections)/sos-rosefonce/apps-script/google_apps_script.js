/**
 * =============================================================================
 * GOOGLE APPS SCRIPT - MASTER COD ORDERS WEBHOOK (OptiTrav / E-commerce)
 * =============================================================================
 * 
 * Ce script unique connecte vos 6 landing pages à votre Google Sheet OptiTrav :
 * 1. Crystal Organic (crystal2)
 * 2. Crystal Rose (crystalrose)
 * 3. SOS Gold (sos1)
 * 4. SOS Rose (sos)
 * 5. SOS Rose 2 (sos2)
 * 6. VitaSilk (vitasilk)
 *
 * ✨ FONCTIONNALITÉS :
 * - Compatible avec l'onglet "Tableau de bord" (Dashboard OptiTrav)
 * - N'écrase JAMAIS le tableau de bord : enregistre toutes les commandes dans l'onglet "Commandes"
 * - Crée et formate automatiquement les en-têtes si l'onglet est nouveau
 * - Normalise les noms des produits pour faciliter les filtres dans le Dashboard
 * - Protège contre les écritures simultanées (LockService)
 * - Préserve le '0' initial des numéros de téléphone marocains/internationaux
 * - Supporte les formats JSON, FormData et URL-Encoded
 */

var TARGET_SHEET_NAME = "Commandes";

function getOrdersSheet(spreadsheet) {
  // 1. Cherche si l'onglet "Commandes" ou "Orders" existe déjà
  var sheet = spreadsheet.getSheetByName(TARGET_SHEET_NAME) || 
              spreadsheet.getSheetByName("Orders") || 
              spreadsheet.getSheetByName("Commandes COD") ||
              spreadsheet.getSheetByName("Suivi des commandes");
  
  if (sheet) {
    return sheet;
  }
  
  // 2. Cherche une feuille qui n'est PAS le "Tableau de bord" ou "Dashboard"
  var allSheets = spreadsheet.getSheets();
  for (var i = 0; i < allSheets.length; i++) {
    var name = allSheets[i].getName().toLowerCase();
    if (!name.includes("tableau") && !name.includes("board") && !name.includes("dash") && !name.includes("charges") && !name.includes("confirmers")) {
      return allSheets[i];
    }
  }
  
  // 3. Sinon, crée automatiquement un nouvel onglet "Commandes"
  sheet = spreadsheet.insertSheet(TARGET_SHEET_NAME);
  return sheet;
}

function setupHeadersIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Date & Heure",
      "Nom Complet",
      "Téléphone",
      "Ville",
      "Adresse",
      "Produit",
      "Pack / Variante",
      "Quantité",
      "Prix Total",
      "Etat de Commande",
      "Confirmer",
      "Etat de Livraison",
      "Langue",
      "Source"
    ];
    
    sheet.appendRow(headers);
    
    // Style de l'en-tête (Design Pro)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#1E293B");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    
    for (var col = 1; col <= headers.length; col++) {
      sheet.autoResizeColumn(col);
    }
  }
}

function normalizeProductName(data) {
  var rawProd = (data.product || data.produit || data.productName || "").trim();
  var rawPack = (data.pack || data.packName || data.routine || data.offer || "").trim();
  var source = (data.source || "").toLowerCase();
  var combined = (rawProd + " " + rawPack + " " + source).toLowerCase();

  // Détection du produit
  if (combined.includes("crystal rose") || combined.includes("crystal® rose") || source.includes("crystal rose") || combined.includes("renaissance")) {
    return "Crystal Rose";
  } else if (combined.includes("crystal") || combined.includes("trio royal") || source.includes("crystal")) {
    return "Crystal Organic";
  } else if (combined.includes("gold") || combined.includes("400g") || source.includes("sosgold") || source.includes("sos1")) {
    return "SOS Gold";
  } else if (combined.includes("sos rose 2") || combined.includes("sos2") || source.includes("sos2") || source.includes("sosrose2")) {
    return "SOS Rose 2";
  } else if (combined.includes("sos rose") || combined.includes("sachet sos") || source.includes("sosrose") || source.includes("sos")) {
    return "SOS Rose";
  } else if (combined.includes("vitasilk") || combined.includes("rituel") || source.includes("vitasilk")) {
    return "VitaSilk";
  }
  
  return rawProd || rawPack || "Produit";
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Évite les conflits d'écritures simultanées

  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrdersSheet(spreadsheet);
    setupHeadersIfEmpty(sheet);

    var data = {};
    
    // Extraction des données (JSON ou Form-Data / Parameters)
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Date et heure au fuseau horaire de Casablanca
    var now = new Date();
    var timestamp = data.date || data.timestamp || data.createdAt || 
                    Utilities.formatDate(now, "Africa/Casablanca", "dd/MM/yyyy HH:mm:ss");

    // Nettoyage et formatage du numéro de téléphone avec une apostrophe pour garder le 0
    var rawPhone = data.phone || data.tel || data.telephone || data.whatsapp || "";
    var phoneFormatted = rawPhone ? "'" + rawPhone.toString().trim() : "";

    var fullName = data.fullName || data.name || data.nom || data.client || "";
    var city = data.city || data.ville || "";
    var address = data.address || data.adresse || data.quartier || data.email || "";
    
    var productName = normalizeProductName(data);
    var packName = data.pack || data.packName || data.routine || data.offer || data.product || "";
    var quantity = data.quantity || data.qty || data.quantite || 1;
    var price = data.price || data.totalPrice || data.total || data.montant || "";
    var language = (data.language || data.lang || "FR").toString().toUpperCase();
    var source = data.source || data.orderRef || "Landing Page";
    var status = data.status || "Nouveau"; // Statut initial pour OptiTrav

    // Insertion de la commande
    sheet.appendRow([
      timestamp,
      fullName,
      phoneFormatted,
      city,
      address,
      productName,
      packName,
      quantity,
      price,
      status,
      "", // Confirmer (à assigner)
      "", // Etat de livraison
      language,
      source
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "success", 
        message: "Commande enregistrée avec succès dans Google Sheets",
        product: productName,
        row: sheet.getLastRow() 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "error", 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("✅ Webhook Google Sheets Actif et Prêt pour recevoir les 6 Landing Pages (OptiTrav COD).")
    .setMimeType(ContentService.MimeType.TEXT);
}
