export const versionFieldSchema = (version) => {
  const regex = /^\d+\.\d+\.\d+$/;
  return regex.test(version);
};
