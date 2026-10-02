// In-memory cache store
const cache = new Map();

// Time to Live: 1 minute (in milliseconds)
const TTL = 60 * 1000;

/**
 * Cache middleware for GET requests.
 * Sets X-Cache header to HIT or MISS.
 */
const cacheMiddleware = (req, res, next) => {
  // Only cache GET requests
  if (req.method !== "GET") {
    return next();
  }

  const key = req.originalUrl;
  const cached = cache.get(key);

  // Check if cache entry exists and is not expired
  if (cached && Date.now() - cached.timestamp < TTL) {
    res.set("X-Cache", "HIT");
    return res.json(cached.data);
  }

  // Cache MISS — override res.json to capture the response and cache it
  res.set("X-Cache", "MISS");
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    // Store in cache with timestamp
    cache.set(key, {
      data: body,
      timestamp: Date.now(),
    });
    return originalJson(body);
  };

  next();
};

/**
 * Invalidates all cache entries.
 * Called after successful POST, PUT, PATCH, DELETE operations.
 */
const invalidateCache = () => {
  cache.clear();
};

module.exports = { cacheMiddleware, invalidateCache };
