import { FilterProps, LimitedTrails } from "@types";

const mockTrails = {
  Manhattan: [
    {
      name: "Central Park Loop",
      location: "Central Park, Manhattan",
      difficulty: "Easy",
      length: "Short",
      rating: "4+",
      noise: "normal",
    },
    {
      name: "Hudson River Greenway",
      location: "Hudson River Park, Manhattan",
      difficulty: "Easy",
      length: "Medium",
      rating: "4+",
      noise: "quiet",
    },
    {
      name: "Riverside Park Trail",
      location: "Riverside Park, Manhattan",
      difficulty: "Moderate",
      length: "Medium",
      rating: "4+",
      noise: "quiet",
    },
    {
      name: "High Line Trail",
      location: "High Line Park, Manhattan",
      difficulty: "Easy",
      length: "Short",
      rating: "4+",
      noise: "normal",
    },
  ],
  Brooklyn: [
    {
      name: "Brooklyn Bridge Park Greenway",
      location: "Brooklyn Bridge Park, Brooklyn",
      difficulty: "Easy",
      length: "Short",
      rating: "4+",
      noise: "normal",
    },
    {
      name: "Prospect Park Loop",
      location: "Prospect Park, Brooklyn",
      difficulty: "Moderate",
      length: "Medium",
      rating: "4+",
      noise: "quiet",
    },
    {
      name: "Greenpoint Waterfront Trail",
      location: "Greenpoint, Brooklyn",
      difficulty: "Easy",
      length: "Medium",
      rating: "4+",
      noise: "normal",
    },
    {
      name: "Brooklyn Heights Promenade",
      location: "Brooklyn Heights, Brooklyn",
      difficulty: "Easy",
      length: "Short",
      rating: "4+",
      noise: "quiet",
    },
  ],
  Queens: [
    {
      name: "Flushing Meadows Corona Park Loop",
      location: "Flushing Meadows Corona Park, Queens",
      difficulty: "Easy",
      length: "Short",
      rating: "4+",
      noise: "loud",
    },
    {
      name: "Alley Pond Park Trail",
      location: "Alley Pond Park, Queens",
      difficulty: "Moderate",
      length: "Medium",
      rating: "4+",
      noise: "loud",
    },
    {
      name: "Forest Park Trail",
      location: "Forest Park, Queens",
      difficulty: "Moderate",
      length: "Medium",
      rating: "4+",
      noise: "normal",
    },
    {
      name: "Queens Botanical Garden Trail",
      location: "Queens Botanical Garden, Queens",
      difficulty: "Easy",
      length: "Short",
      rating: "4+",
      noise: "quiet",
    },
  ],
  Bronx: [
    {
      name: "Van Cortlandt Park Trail",
      location: "Van Cortlandt Park, Bronx",
      difficulty: "Moderate",
      length: "Medium",
      rating: "4+",
      noise: "normal",
    },
    {
      name: "Pelham Bay Park Trail",
      location: "Pelham Bay Park, Bronx",
      difficulty: "Hard",
      length: "Long",
      rating: "5",
      noise: "quiet",
    },
    {
      name: "Bronx River Greenway",
      location: "Bronx River Park, Bronx",
      difficulty: "Easy",
      length: "Medium",
      rating: "4+",
      noise: "normal",
    },
    {
      name: "Wave Hill Loop",
      location: "Wave Hill, Bronx",
      difficulty: "Moderate",
      length: "Short",
      rating: "4+",
      noise: "quiet",
    },
  ],
  StatenIsland: [
    {
      name: "Greenbelt Trail",
      location: "Staten Island Greenbelt, Staten Island",
      difficulty: "Moderate",
      length: "Medium",
      rating: "4+",
      noise: "quiet",
    },
    {
      name: "South Beach Boardwalk",
      location: "South Beach, Staten Island",
      difficulty: "Easy",
      length: "Short",
      rating: "4+",
      noise: "loud",
    },
    {
      name: "High Rock Park Trail",
      location: "High Rock Park, Staten Island",
      difficulty: "Moderate",
      length: "Long",
      rating: "4+",
      noise: "normal",
    },
    {
      name: "Great Kills Park Trail",
      location: "Great Kills Park, Staten Island",
      difficulty: "Easy",
      length: "Short",
      rating: "4+",
      noise: "quiet",
    },
  ],
};

export async function fetchTrailss(filters: FilterProps) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let totalTrails = 0;
      const limitedTrails: LimitedTrails = {};

      Object.entries(mockTrails).forEach(([borough, trails]) => {
        limitedTrails[borough] = [];
        trails.forEach((trail) => {
          if (totalTrails < (filters.limit || 10)) {
            limitedTrails[borough].push(trail);
            totalTrails++;
          } else {
            return;
          }
        });
      });

      resolve(limitedTrails);
    }, 1000);
  });
}

export async function fetchTotalTrails() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allTrails = Object.values(mockTrails).flat();
      resolve(allTrails.length);
    }, 1000);
  });
}
