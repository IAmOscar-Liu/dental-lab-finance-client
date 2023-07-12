export const isLinkActive = ({
  currentPathname,
  myPathname,
}: {
  currentPathname: string;
  myPathname: string;
}) =>
  myPathname === currentPathname ||
  (myPathname.startsWith("/dental-lab-management/overview") &&
    currentPathname.startsWith("/dental-lab-management/overview")) ||
  (myPathname.startsWith("/dental-lab-management/update") &&
    currentPathname.startsWith("/dental-lab-management/update")) ||
  (myPathname.startsWith("/contract-management/overview") &&
    currentPathname.startsWith("/contract-management/overview")) ||
  (myPathname.startsWith("/contract-management/update") &&
    currentPathname.startsWith("/contract-management/update")) ||
  (myPathname.startsWith("/equipment-management/overview") &&
    currentPathname.startsWith("/equipment-management/overview")) ||
  (myPathname.startsWith("/equipment-management/update") &&
    currentPathname.startsWith("/equipment-management/update"));
