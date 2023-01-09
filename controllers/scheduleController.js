// Pretty much plantings queries but also maybe harvest queries?

// Find episodes that aired on this exact date
return Episode.find({ airedAt: new Date('1987-10-26') }).
  then(episodes => {
    episodes[0].title; // "Where No One Has Gone Before"
    // Find episodes within a range of dates, sorted by date ascending
    return Episode.
      find({ airedAt: { $gte: '1987-10-19', $lte: '1987-10-26' } }).
      sort({ airedAt: 1 });
  }).
  then(episodes => {
    episodes[0].title; // "The Last Outpost"
    episodes[1].title; // "Where No One Has Gone Before"
  });