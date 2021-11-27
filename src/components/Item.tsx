import { Box } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

type Props = {
  id: string;
} & React.HTMLAttributes<HTMLDivElement>;

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, Props>(({ id, ...props }, ref) => {
  return (
    <Box {...props} ref={ref}>
      {props.children}
    </Box>
  );
});

export default Item;
