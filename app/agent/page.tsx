"use client";

import AgentGuard from '@/components/AgentGuard';
import AgentOrderDashboard from '@/components/agent/AgentOrderDashboard';

export default function AgentPage() {
  return (
    <AgentGuard>
      <AgentOrderDashboard />
    </AgentGuard>
  );
}
