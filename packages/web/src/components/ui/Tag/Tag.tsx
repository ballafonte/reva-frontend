import { Box } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { tagStyles } from './Tag.styles';
import { TagProps } from './Tag.types';

export const Tag = (props: TagProps) => {
  const { label, context, onDelete, deleteIcon, size, variant, ...rest } =
    props;
  const styles = tagStyles({ context, size, variant });

  return (
    <Box component="span" sx={styles} {...rest}>
      {label}
      {onDelete && (
        <Box
          component="span"
          onClick={onDelete}
          sx={{
            marginLeft: '4px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {deleteIcon || (
            <CancelIcon sx={{ fontSize: size === 'small' ? 14 : 16 }} />
          )}
        </Box>
      )}
    </Box>
  );
};
