import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleProgress = (url: string) => {
      const newProgress = calculateProgress(url);
      setProgress(newProgress);
    };

    // Add event listeners to track progress during page loading
    router.events.on('routeChangeStart', handleProgress);
    router.events.on('routeChangeComplete', handleProgress);
    router.events.on('routeChangeError', handleProgress);

    // Clean up the event listeners
    return () => {
      router.events.off('routeChangeStart', handleProgress);
      router.events.off('routeChangeComplete', handleProgress);
      router.events.off('routeChangeError', handleProgress);
    };
  }, [router.events]);

  const calculateProgress = (url: string): number => {
    const resources = window.performance.getEntriesByType('resource');
    const totalSize = resources.reduce(
      (sum, resource) => sum + (resource as PerformanceResourceTiming).transferSize,
      0
    );
    const loadedSize = resources
      .filter((resource) => resource.name === url)
      .reduce(
        (sum, resource) => sum + (resource as PerformanceResourceTiming).transferSize,
        0
      );
    const percentage = (loadedSize / totalSize) * 100;
    return percentage;
  };
  
  return <span>{progress}</span>;
};

export default Loader;
