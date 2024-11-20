export const getRoleClass = (role: string) => {
  switch (role) {
    case 'membro':
      return 'bg-[#221E20] text-white';
    case 'assinante':
      return 'bg-bgBtn text-white';
    default:
      return 'bg-gray-300 text-gray-900';
  }
};
