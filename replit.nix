{ pkgs }: {
  deps = [
    pkgs.nodejs-20_x
    pkgs.nodePackages.typescript
    pkgs.yarn
    pkgs.replitPackages.jest
    pkgs.mysql80
    pkgs.mysql80.dev
  ];
} 