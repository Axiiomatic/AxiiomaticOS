import { useState, useEffect } from "react";

const LoadingHook = () => {
  const [loadPrompt, setLoadPrompt] = useState<string | undefined>('/');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {

      setLoadingProgress((prev) => {
        if (prev >= 150) {
          // Finished loading
          return 150; // Ensure it caps at 100%
        }
        if (prev >= 100) {
          return prev + 1;
        }
        return prev + 2*Math.random(); // Increase progress by 2% every 100ms
      });
    }, 60);

    const loadInterval = setInterval(() => {
      setLoadPrompt((prev) => {
        switch (prev) {
          case '/':
            return '-'
          case '-':
            return '\\'
          case '\\':
            return '/'
        }
      })
    }, 200)

    return () => {
      clearInterval(interval);
      clearInterval(loadInterval);
    };
  }, []);


    return {
        loadPrompt,
        setLoadPrompt,
        loadingProgress,
        setLoadingProgress
    };
};

export default LoadingHook;
