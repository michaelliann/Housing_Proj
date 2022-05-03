/**
 * Gets the duration of a trip on an average day from address to Price Center
 * @param address - the address to get duration (from address to Price Center)
 * @return - There are two return options:
 *           1) the duration (type google.maps.Duration has a string and number
 *           representation of the duration, where the number is in seconds), OR
 *           2) undefined if there were zero results (no route could be found to UCSD
 *           with transit options)
 * @error - throws an error if the address is not recognizable by Google
 */
export const getDuration = async (
  address: string,
): Promise<google.maps.Duration | undefined> => {
  // const { google } = window;
  const DistanceMatrixService = new window.google.maps.DistanceMatrixService();
  const priceCenterCoordinates = '32.8797,-117.2362';

  return new Promise((resolve, reject) => {
    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [address],
        destinations: [priceCenterCoordinates],
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
          arrivalTime: new Date(), // TODO test this as a param (for constant date): 'November 8, 2019 18:00:00'
          modes: [google.maps.TransitMode.BUS],
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          // check the resulting element for success or failure
          const result = (response as google.maps.DistanceMatrixResponse).rows[0].elements[0];
          const Statuses = google.maps.DistanceMatrixElementStatus;

          if (result.status === Statuses.OK) {
            resolve(result.duration);
          } else if (result.status === Statuses.ZERO_RESULTS) {
            // TODO need to add fallback here (i.e. use driving instead), but also somehow handle telling users that there is no public transportation route
            resolve(undefined);
          } else if (result.status === Statuses.NOT_FOUND) {
            reject(result.status);
          }
        } else {
          console.error(`The getDuration failed, with status: ${status}`);
          reject(status);
        }
      },
    );
  });
};

/**
 * Gets the duration of a trip on an average day from address to Price Center
 * in minutes, as a string
 * @param address - the address to get duration (from address to Price Center)
 * @return - There are two return options:
 *           1) minutes from the address to Price Center, as a string (i.e. 128 min)
 *           2) undefined if there were zero results (no route could be found to UCSD
 *           with transit options)
 * @error - throws an error if the address is not recognizable by Google
 */
export const getDurationInMinutes = async (
  address: string,
): Promise<string | undefined> => {
  const result = await getDuration(address);
  if (!result) return undefined;

  const minutes = Math.round(result.value / 60);

  return `${minutes} min`;
};

/**
 * Function to test getDuration
 */
export const testGetDuration = async () => {
  const tests = [
    '9775 Genesee Ave, San Diego, CA 92121',
    '4313 Cozzens Ct, San Diego, CA 92122',
    '4588 Robbins St, San Diego, CA 92122',
    '11645 Thistle Hill Pl, San Diego, CA 92130',
    '28466 Foothill Dr, Agoura Hills, CA 91301',
  ];

  tests.forEach((address) => {
    getDuration(address).then((result) => {
      console.log(`The result for the address ${address} is:`);
      console.log(result);
    });
    getDurationInMinutes(address).then((result) => {
      console.log(`The result for the address ${address} in minutes is:`);
      console.log(result);
    });
  });
};
