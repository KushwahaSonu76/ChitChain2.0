import { useState } from 'react';
import { useWallet } from '../lib/wallet/WalletContext';
import { createChitTx } from '../lib/contract/soroban';
import { useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';

const CreateChit = () => {
  const { address, kit } = useWallet();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('');
  const [membersStr, setMembersStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !kit) return;
    
    setError('');
    setLoading(true);

    try {
      const members = membersStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
      if (!members.includes(address)) {
        members.unshift(address); // Ensure creator is a member
      }

      if (members.length < 2) {
        throw new Error("You need at least 2 members to form a group.");
      }

      const numAmount = parseFloat(amount) * 10000000;
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error("Please enter a valid amount.");
      }

      // Hardcoded testnet XLM token address for MVP
      const tokenAddress = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC';

      // Submit & Sign via Freighter (actually sends transaction to Testnet)
      const receipt = await createChitTx(kit, address, members, numAmount, members.length, tokenAddress);
      console.log("Transaction finalized on-chain:", receipt);
      
      posthog.capture('chit_created', { members_count: members.length, amount: numAmount });
      alert("Chit Group successfully created on-chain!");
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while creating the group.');
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Please connect your wallet to create a group.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
      <h1 className="text-3xl font-bold text-stellar mb-2">Create a Chit Group</h1>
      <p className="text-gray-500 mb-8">Form a new trustless savings group. You'll be the first member.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution (XLM)</label>
          <input
            type="number"
            min="1"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            placeholder="e.g. 100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Invite Members (Stellar Addresses)</label>
          <p className="text-xs text-gray-500 mb-2">Enter public keys separated by commas.</p>
          <textarea
            required
            rows={4}
            value={membersStr}
            onChange={(e) => setMembersStr(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none font-mono text-sm"
            placeholder="GABC123..., GDEF456..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center disabled:opacity-70"
        >
          {loading ? (
            <span className="animate-pulse">Creating via Smart Contract...</span>
          ) : (
            'Deploy Group to Soroban'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateChit;
