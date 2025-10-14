"use client";

interface Investment {
  type: string;
  amount: string;
  openDate: string;
  nextPayment: string;
  earnings: string;
}

const investments: Investment[] = [
  {
    type: "Renta Fija 2.0",
    amount: "$1,500.00",
    openDate: "15/08/2024",
    nextPayment: "15/09/2024",
    earnings: "+$45.00",
  },
  {
    type: "Renta Variable 2.0",
    amount: "$2,300.00",
    openDate: "10/08/2024",
    nextPayment: "10/09/2024",
    earnings: "+$138.10",
  },
];

export function InvestmentsTable() {
  return (
    <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-white text-base font-semibold">Inversiones activas</h3>
        <button className="text-blue-500 hover:text-blue-400 text-sm">Ver más</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-400">Tipo de renta</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-400">Inversión</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-400">Fecha de apertura</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-400">Próximo pago</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-400">Ganancias</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-400">Detalles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {investments.map((investment, index) => (
              <tr key={index} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">{investment.type}</td>
                <td className="px-6 py-4 text-sm text-white">{investment.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{investment.openDate}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{investment.nextPayment}</td>
                <td className="px-6 py-4 text-sm text-green-500 font-medium">{investment.earnings}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-400 text-sm">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

