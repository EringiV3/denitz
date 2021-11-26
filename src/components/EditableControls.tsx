import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react';

const EditableControls: React.FC = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="ok"
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="close"
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Box display="flex" justifyContent="center">
      <IconButton
        aria-label="edit"
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Box>
  );
};

export default EditableControls;
