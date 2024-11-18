import { LayoutDashboard } from '../../../shared/layouts';

export const PageMembers = () => {
  return (
    <LayoutDashboard>
      <div>
        <div>
          <button>EXPORTAR</button>
          <button>filtro 1</button>
          <button>filtro 2</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>inscritos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>membros</td>
                <td>10</td>
              </tr>
              <tr>
                <td>assinantes</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ex assinantes</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white mt-4 border border-gray-300 rounded-lg font-montserrat font-medium italic overflow-y-auto">
        <ul>
          <li className="border-b border-gray-300 p-4 last:border-0 flex justify-between item-center">
            <p>Teste</p>
            <p>assinante</p>
          </li>
        </ul>
      </div>
    </LayoutDashboard>
  );
};
