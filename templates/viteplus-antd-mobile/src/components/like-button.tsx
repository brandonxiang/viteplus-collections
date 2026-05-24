import { useFetcher } from 'react-router';
import { useState } from 'react';

interface LikeButtonProps {
  itemId: string;
  initialLikes?: number;
}

export function LikeButton({ itemId, initialLikes = 0 }: LikeButtonProps) {
  const fetcher = useFetcher();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    // Optimistic update
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);

    // Submit to action without navigation
    void fetcher.submit(
      {
        action: 'like',
        itemId,
        liked: (!isLiked).toString(),
      },
      {
        method: 'post',
        action: '/api/like', // This would be handled by a route action
      },
    );
  };

  return (
    <button
      onClick={handleLike}
      disabled={fetcher.state === 'submitting'}
      style={{
        padding: '8px 16px',
        backgroundColor: isLiked ? '#1976d2' : '#f5f5f5',
        color: isLiked ? 'white' : '#333',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: fetcher.state === 'submitting' ? 'not-allowed' : 'pointer',
        opacity: fetcher.state === 'submitting' ? 0.6 : 1,
      }}
    >
      {fetcher.state === 'submitting' ? 'Liking...' : `👍 ${likes}`}
    </button>
  );
}
