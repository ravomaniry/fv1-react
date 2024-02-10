import React from 'react';
import Markdown from 'react-markdown';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  imagePath: string;
  description: string;
  isMarkdown?: boolean;
}

const ImageWithDescription: React.FC<Props> = ({ title, imagePath, description, isMarkdown = false }) => {
  return (
    <Box padding={1}>
      <Typography
        color='primary'
        variant='h3'
      >
        {title}
      </Typography>
      <div>
        <img
          src={imagePath}
          alt={title}
          style={{ width: '100%' }}
        />
      </div>
      {isMarkdown ? <Markdown>{description}</Markdown> : <Typography>{description}</Typography>}
    </Box>
  );
};

export default ImageWithDescription;
