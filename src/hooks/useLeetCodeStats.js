import { useState, useEffect } from 'react';

const QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
    profile {
      ranking
    }
  }
  userContestRanking(username: $username) {
    rating
  }
}
`;

export function useLeetCodeStats(username, fallbackStats) {
  const [stats, setStats] = useState(fallbackStats);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Check cache to avoid rate limits
      const cacheKey = `leetcode_stats_${username}`;
      const cached = sessionStorage.getItem(cacheKey);
      
      if (cached) {
        setStats(JSON.parse(cached));
        setIsLive(true);
        return;
      }

      // 2. Fetch from LeetCode GraphQL
      try {
        const response = await fetch('https://leetcode.com/graphql/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: QUERY,
            variables: { username }
          })
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const { data } = await response.json();
        
        if (data && data.matchedUser) {
          const solved = data.matchedUser.submitStats.acSubmissionNum.find(d => d.difficulty === 'All')?.count || fallbackStats[1].value;
          const ranking = data.userContestRanking?.rating ? Math.round(data.userContestRanking.rating) : fallbackStats[2].value;
          const topPercentage = fallbackStats[0].value; // Kept static for simplicity, requires another query to fetch

          const newStats = [
            { value: topPercentage, suffix: "%", label: "Top Global" },
            { value: solved, suffix: "+", label: "Problems Solved" },
            { value: ranking, suffix: "+", label: "Contest Rating" },
          ];

          setStats(newStats);
          setIsLive(true);
          sessionStorage.setItem(cacheKey, JSON.stringify(newStats));
        }
      } catch (error) {
        console.warn("Failed to fetch live LeetCode stats (likely CORS), using static fallback.", error);
        // Silently fail and continue using fallbackStats
      }
    };

    if (username) {
      fetchStats();
    }
  }, [username, fallbackStats]);

  return { stats, isLive };
}
