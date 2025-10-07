export const navData = [
    {
      id: 1,
      label: "Home",
      href: "/",
      type: "link",
    },
    {
      id: 2,
      label: "About",
      href: "/About",
      type: "link",
    },
    {
      id: 3,
      label: "App",
      href: "/App",
      type: "link",
    },
    {
      id: "services",
      label: "Services",
      href: "/Service",
      type: "link",
    //   subItems: [
    //     {
    //       id: "sub1",
    //       label: "Services1",
    //       href: "/Services1",
    //     },
    //     {
    //       id: "sub2",
    //       label: "Services2",
    //       href: "/Services2",
    //     },
    //   ],
    },
    // {
    //   id: 5,
    //   label: "Partner",
    //   href: "/Partner",
    //   type: "link",
    // },
    {
      id: 6,
      label: "Contact Us",
      href: "/Contact",
      type: "link",
    },
    {
      id: "7",
      label: "Login",
      href: "#",
      type: "dropdown",
      subItems: [
        {
          id: "1",
          label: "Back-Office",
          href: "/Backoffice",
        },
        {
          id: "2",
          label: "Web-Terminal",
          href: "/Webterminal",
        },
      ],
    },
  ];