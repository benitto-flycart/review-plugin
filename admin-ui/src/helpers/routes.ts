const routes = [
  {
    name: "affiliate.update",
    url: "/affiliates/update/:id",
    resolve: (id: unknown) => `/affiliates/update/${id}`,
  },
  {
    name: "programs.update",
    url: "/manage/programs/:id",
    resolve: (id: unknown) => `/manage/programs/${id}`,
  },
];

export const resolveRoute = (name: string, params?: any) => {
  let matchedRoute = routes.find((route, index) => {
    return route.name == name;
  });

  if (!matchedRoute) return "/";

  if (matchedRoute.hasOwnProperty("resolve")) {
    let resolve = matchedRoute["resolve"];

    // @ts-ignore
    return resolve(params);
  } else {
    return matchedRoute["url"];
  }
};
