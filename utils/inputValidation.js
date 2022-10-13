const { metaversesJson } = require("../constants");

export const validateMetaverseFilter = (metaverseFilter) => {
  if (typeof metaverseFilter === "string") {
    metaverseFilter = [metaverseFilter];
  } else if (metaverseFilter.length === 0) {
    metaverseFilter.push(null);
  }

  const availiableMetaverses = metaversesJson.map((m) => m.slug.toLowerCase());
  if (metaverseFilter.length == 1 && metaverseFilter[0] == null) {
  } else {
    metaverseFilter = new Set(metaverseFilter.map((m) => m.toLowerCase()));
    for (const m of metaverseFilter) {
      if (!availiableMetaverses.includes(m)) {
        return false;
      }
    }
  }

  return Array.from(metaverseFilter);
};

export const validateTypeFilter = (typeFilter) => {
  if (typeof typeFilter === "string") {
    typeFilter = [typeFilter];
  } else if (typeFilter.length === 0) {
    typeFilter.push(null);
  }

  const availiableTypes = ["AVATAR", "WEARABLE", "MISC"];

  if (typeFilter.length == 1 && typeFilter[0] == null) {
  } else {
    typeFilter = new Set(typeFilter.map((m) => m.toUpperCase()));
    for (const m of typeFilter) {
      if (!availiableTypes.includes(m)) {
        return false;
      }
    }
  }

  return Array.from(typeFilter);
};

export const validateSubtypeFilter = (subtypeFilter) => {
  if (typeof subtypeFilter === "string") {
    subtypeFilter = [subtypeFilter];
  } else if (subtypeFilter.length === 0) {
    subtypeFilter.push(null);
  }

  subtypeFilter = new Set(subtypeFilter);

  return Array.from(subtypeFilter);
};
