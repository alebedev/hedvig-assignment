export type Icon = {
  svgUrl: string;
};

export type Peril = {
  title: string;
  description: string;
  shortDescription: string;
  covered: string[];
  exceptions: string[];
  info: string;
  icon: {
    variants: {
      light: Icon;
      dark: Icon;
    };
  };
};

const API_PREFIX = "https://hedvig-rest-api-test.herokuapp.com/api";

export type FetchPerilsOptions = {
  contractType: string;
  locale: string;
};

export async function fetchPerils(
  options: FetchPerilsOptions
): Promise<Peril[]> {
  const url = new URL(`${API_PREFIX}/perils`);
  url.search = new URLSearchParams(options).toString();
  return fetch(url.toString(), { mode: "cors" }).then((resp) => {
    if (!resp.ok) {
      throw new Error("Error response");
    }
    return resp.json();
  });
}
