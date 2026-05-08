import { useEffect, useMemo, useState } from "react";
import { getImageCandidates } from "../utils/getImageUrl";

export default function BookCover({
  path,
  alt,
  className = "",
  fallbackClassName = "",
  fallbackText = "No image",
}) {
  const candidates = useMemo(() => getImageCandidates(path), [path]);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFailed(false);
  }, [path]);

  if (!path || failed || candidates.length === 0) {
    return <div className={fallbackClassName}>{fallbackText}</div>;
  }

  return (
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      onError={() => {
        setIndex((current) => {
          const next = current + 1;
          if (next >= candidates.length) {
            setFailed(true);
            return current;
          }
          return next;
        });
      }}
    />
  );
}
