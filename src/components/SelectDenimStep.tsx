import { Box, Button, ButtonGroup, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import DenimCard from '../components/DenimCard';
import { useDenimReportCreator } from '../hooks/useDenimReportCreator';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import { submitDataState } from '../states/denimReportCreator';

const SelectDenimStep: React.FC = () => {
  const { client, hasToken } = useGraphqlClient();
  const [selectedDenimId, setSelectedDenimId] = useState<string | null>(null);
  const { goToNextStep } = useDenimReportCreator();
  const setSubmitData = useSetRecoilState(submitDataState);
  const toast = useToast();

  const { data: currentUserData } = useQuery(
    ['currentUser'],
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const handleClickCard = (denimId: string) => {
    setSelectedDenimId(denimId);
  };

  const handleClickNext = () => {
    if (selectedDenimId === null) {
      toast({
        title: 'デニムを選択してください',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    setSubmitData((submitData) => ({
      ...submitData,
      denimId: selectedDenimId,
    }));
    goToNextStep();
  };

  return (
    <>
      <Box>
        {currentUserData?.getCurrentUser?.denims?.map((denim) => (
          <Box
            key={denim.id}
            marginTop="20px"
            onClick={() => handleClickCard(denim.id)}
          >
            <DenimCard
              denim={denim}
              showBorder={selectedDenimId === denim.id}
            />
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginTop="40px">
        <ButtonGroup>
          <Button onClick={handleClickNext}>次へ</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default SelectDenimStep;
