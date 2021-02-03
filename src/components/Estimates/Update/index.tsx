import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { barcodeToText, EstimateStatus, keepingTypeToText } from './static';
import {
  Container,
  Wrapper,
  InformationContainer,
  Title,
  BlueText,
  ItemInformationText,
  ItemContainer,
  ItemWrapper,
  ItemText,
  URLText,
  ReleaseNumberContainer,
  Text,
  Content,
  UserInfoContainer,
  UserLineWrapper,
  StatusButtonWrapper,
  StatusButton,
  UpdateStatusButton,
  UpdateStatusButtonWrapper,
} from './styles';

interface IUser {
  userId: number;
  name: string;
  email: string;
  type: string;
  phoneNumber: string;
  telephoneNumber: string;
  companyName: string;
  role: string;
  isDeleted: boolean;
}

interface IItem {
  id: number;
  name: string;
  keepingNumber: number;
  weight: number;
  barcode: string;
  sku: number;
  url?: string;
  perimeter: number;
  keepingType: string;
}

interface IUpdateDataProps {
  estimateData: {
    id: number;
    content: string;
    status: string;
    monthlyAverageRelease: number;
    user: IUser;
    warehouseName: string;
    items: Array<IItem>;
  };
}

const UpdateData: React.FC<IUpdateDataProps> = ({ estimateData }) => {
  const params = useParams<{ estimateId: string }>();
  const [estimateStatus, setEstimateStatus] = useState(estimateData.status);
  useEffect(() => {
    console.log(estimateData);
  }, []);
  return (
    <Container>
      <Wrapper>
        <InformationContainer>
          <Title>{estimateData.warehouseName} 견적 문의</Title>
          <BlueText>상품 내역</BlueText>
          <div style={{ borderBottom: '1px solid black' }}>
            <ItemContainer>
              <ItemInformationText>상품 종류</ItemInformationText>
              <ItemInformationText>상품 크기</ItemInformationText>
              <ItemInformationText>상품 무게</ItemInformationText>
              <ItemInformationText>SKU</ItemInformationText>
              <ItemInformationText>보관 수량</ItemInformationText>
              <ItemInformationText>보관 형태</ItemInformationText>
              <ItemInformationText>바코드</ItemInformationText>
              <ItemInformationText>상품 URL</ItemInformationText>
            </ItemContainer>
            {estimateData.items.map((item, idx) => {
              return (
                <ItemWrapper key={idx}>
                  <ItemText>{item.name}</ItemText>
                  <ItemText>{item.perimeter} cm</ItemText>
                  <ItemText>{item.weight} kg</ItemText>
                  <ItemText>{item.sku} 개</ItemText>
                  <ItemText>{item.keepingNumber} 개</ItemText>
                  <ItemText>{keepingTypeToText(item.keepingType)}</ItemText>
                  <ItemText>{barcodeToText(item.barcode)}</ItemText>
                  {item.url === null ? (
                    <URLText isUrlNull={true}>없음</URLText>
                  ) : (
                    <URLText
                      isUrlNull={false}
                      onClick={() => window.open(item.url)}
                    >
                      클릭
                    </URLText>
                  )}
                </ItemWrapper>
              );
            })}
          </div>
          <ReleaseNumberContainer>
            <Text>월간 평균 출고량(총합)</Text>
            <BlueText fontSize="15px" padding="0 0 0 10px">
              {estimateData.monthlyAverageRelease}
            </BlueText>
            <Text>건</Text>
          </ReleaseNumberContainer>
          <BlueText>요청 및 유의사항</BlueText>
          <Content readOnly={true} value={estimateData.content} />
          <BlueText>셀러 정보</BlueText>
          <UserInfoContainer>
            <UserLineWrapper>
              <BlueText fontSize="15px" padding="0">
                성함
              </BlueText>
              <Text marginLeft="8px">{estimateData.user.name}</Text>
            </UserLineWrapper>
            <UserLineWrapper>
              <BlueText fontSize="15px" padding="0">
                회사
              </BlueText>
              <Text marginLeft="8px">{estimateData.user.companyName}</Text>
            </UserLineWrapper>
            <UserLineWrapper>
              <BlueText fontSize="15px" padding="0">
                유선
              </BlueText>
              <Text marginLeft="8px">{estimateData.user.telephoneNumber}</Text>
            </UserLineWrapper>
            <UserLineWrapper>
              <BlueText fontSize="15px" padding="0">
                휴대폰
              </BlueText>
              <Text marginLeft="8px">{estimateData.user.phoneNumber}</Text>
            </UserLineWrapper>
            <UserLineWrapper>
              <BlueText fontSize="15px" padding="0">
                이메일
              </BlueText>
              <Text marginLeft="8px">{estimateData.user.email}</Text>
            </UserLineWrapper>
          </UserInfoContainer>
          <BlueText>진행 상태</BlueText>
          <StatusButtonWrapper>
            {EstimateStatus.map((status, idx) => {
              return (
                <StatusButton
                  key={`SB${idx}`}
                  isMatch={estimateStatus === status.value}
                >
                  {status.children}
                </StatusButton>
              );
            })}
          </StatusButtonWrapper>
          <UpdateStatusButtonWrapper>
            <UpdateStatusButton>상태 업데이트</UpdateStatusButton>
          </UpdateStatusButtonWrapper>
        </InformationContainer>
      </Wrapper>
    </Container>
  );
};

export default UpdateData;
