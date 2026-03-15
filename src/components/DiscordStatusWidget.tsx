import { motion } from 'framer-motion';
import useDiscordStatus from '../hooks/useDiscordStatus';

interface DiscordStatusWidgetProps {
  userId: string;
  showActivity?: boolean;
}

const DiscordStatusWidget = ({ userId, showActivity = true }: DiscordStatusWidgetProps) => {
  const { status, activity, spotify, loading } = useDiscordStatus(userId);

  const statusColors: Record<string, { bg: string; dot: string; text: string }> = {
    online: { bg: 'bg-green-500/10', dot: 'bg-green-500', text: 'Online' },
    idle: { bg: 'bg-yellow-500/10', dot: 'bg-yellow-500', text: 'Ausente' },
    dnd: { bg: 'bg-red-500/10', dot: 'bg-red-500', text: 'Não Perturbar' },
    offline: { bg: 'bg-gray-500/10', dot: 'bg-gray-500', text: 'Offline' },
  };

  const colors = status ? statusColors[status] : statusColors.offline;

  if (loading) return <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" aria-hidden="true" />;

  if (spotify && showActivity) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        role="status"
        aria-label={`Ouvindo ${spotify.song} no Spotify`}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
        <span className="text-xs font-medium" style={{ color: 'var(--theme-text, white)', opacity: 0.9 }}>🎵 {spotify.song}</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      role="status"
      aria-label={`Status do Discord: ${colors.text}`}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} border border-white/10`}
    >
      <div className={`w-2 h-2 rounded-full ${colors.dot}`} aria-hidden="true" />
      <span className="text-xs font-medium" style={{ color: 'var(--theme-text, white)', opacity: 0.8 }}>{colors.text}</span>
    </motion.div>
  );
};

export default DiscordStatusWidget;
