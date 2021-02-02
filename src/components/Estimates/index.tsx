import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { statusToText, statusToColor } from './static';
import {
  Container,
  Wrapper,
  InformationContainer,
  ImageContainer,
  Image,
  Text,
  NavBar,
  NavText,
  WarehouseContainer,
  Status,
  Name,
  Date,
  ShowMoreButton,
} from './styles';
import LogoImage from '../../assets/LOGO.png';
import { estimateApi } from '../../api';
import ErrorPage from '../Common/ErrorPage';
import { message } from 'antd';

interface ApiResult {
  warehouseId: number;
  status: string;
  name: string;
  lastModifiedAt: string;
  id: number;
}

const Estimates: React.FC = () => {
  const params = useParams<{ estimateStatus: string }>();
  const [results, setResults] = useState<Array<ApiResult>>([]);
  const [isExtraLoading, setIsExtraLoading] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const token = localStorage.getItem('AccessToken') || 'abc';

  const getApi = useCallback(async () => {
    estimateApi
      .getEstimates(token, pageIndex, 10, params.estimateStatus)
      .then(({ data: { estimates } }) => {
        if (isExtraLoading) {
          setResults((prevResults) => [...prevResults, ...estimates]);
        } else {
          setResults(estimates);
        }
      })
      .catch(({ response: { status } }) => {
        if (status === 404) {
          if (isExtraLoading) {
            message.warning('더 이상 결과가 없습니다.');
          } else {
            message.warning('결과가 존재하지 않습니다.');
          }
        }
      });
  }, [pageIndex, isExtraLoading, setResults, params, token]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  if (token === null) {
    return (
      <ErrorPage
        title="잘못된 접근입니다."
        message="로그인을 먼저 해주세요."
        locationToGo="/"
        buttonMessage="로그인"
      />
    );
  } else
    return (
      <Container>
        <Wrapper>
          <InformationContainer>
            <ImageContainer>
              <Image logoImage={LogoImage}></Image>
            </ImageContainer>
            <Text>견적 요청 관리</Text>
            <Header
              handleClick={() => {
                setIsExtraLoading(false);
                setPageIndex(0);
              }}
              estimateStatus={params.estimateStatus}
            />
            <NavBar>
              <NavText width={'10%'}>상태</NavText>
              <NavText width={'60%'}>창고 정보</NavText>
              <NavText width={'30%'}>최근 수정일</NavText>
            </NavBar>
            {results.map((result, idx) => {
              return (
                <WarehouseContainer key={idx}>
                  <Status color={statusToColor(result.status)}>
                    {statusToText(result.status)}
                  </Status>
                  <Name to={`/estimates/edit/${result.id}`}>{result.name}</Name>
                  <Date>{result.lastModifiedAt}</Date>
                </WarehouseContainer>
              );
            })}
            {results.length % 10 === 0 && results.length !== 0 ? (
              <ShowMoreButton
                onClick={() => {
                  setPageIndex(pageIndex + 1);
                  setIsExtraLoading(true);
                }}
              >
                더 보기
              </ShowMoreButton>
            ) : null}
          </InformationContainer>
        </Wrapper>
      </Container>
    );
};

export default Estimates;