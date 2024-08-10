vi.mock('@/assets/icons/heart.svg?react', () => ({
  default: ({ onClick }: { onClick?: () => void }) => (
    <svg data-icon-name="heart" onClick={onClick}><title>HeartIcon</title></svg>
  ),
}));

vi.mock('@/assets/icons/chat-oval.svg?react', () => ({
  default: ({ onClick }: { onClick?: () => void }) => (
    <svg data-icon-name="chat-oval" onClick={onClick}><title>ChatBubble</title></svg>
  ),
}));

vi.mock('@/assets/icons/ellipsis.svg?react', () => ({
  default: ({ onClick }: { onClick?: () => void }) => (
    <svg data-icon-name="ellipsis" onClick={onClick}><title>ellipsis</title></svg>
  ),
}));

