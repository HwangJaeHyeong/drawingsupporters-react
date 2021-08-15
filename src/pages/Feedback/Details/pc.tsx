import { requestDetail } from 'api/feedback';
import { ReducerType } from 'features';
import { StateType } from 'features/userInfo/loginSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import * as Styled from './styled';

type DataProps = {
	title: string;
	description: string;
	feedback_type: string[];
	feedback_file_type: string;
	price_lower_limit: number;
	price_upper_limit: number;
	regist_date: string;
	thumbnail_list: string[];
};

const FeedbackDetails = () => {
	const location = useLocation();
	const history = useHistory();
	const requestId = location.pathname.split('/')[3];
	const [data, setData] = useState<DataProps>();
	const loginData = useSelector<ReducerType, StateType>((state) => state.login);

	useEffect(() => {
		requestDetail(requestId).then((res) => {
			setData(res.data);
			console.log(res);
		});
	}, []);

	return (
		<Styled.Root>
			<Styled.TitleTypo>피드백 요청 상세</Styled.TitleTypo>
			<Styled.FeedbackContainer>
				<Styled.FeedbackTitleTypo>{data?.title}</Styled.FeedbackTitleTypo>
				<Styled.MenuTypo>피드백 유형</Styled.MenuTypo>
				<Styled.DescriptionTypo>{data?.description}</Styled.DescriptionTypo>
				<Styled.MenuTypo>피드백 분야</Styled.MenuTypo>
				<Styled.ContentChipContainer>
					{data?.feedback_type?.map((type: string, index: number) => (
						<Styled.ContentChip key={`feedback_type_${index}`}>
							<Styled.ContentChipTypo>{type}</Styled.ContentChipTypo>
						</Styled.ContentChip>
					))}
				</Styled.ContentChipContainer>

				<Styled.MenuTypo>작성 일자</Styled.MenuTypo>
				<Styled.ContentChipContainer>
					<Styled.ContentChip>
						<Styled.ContentChipTypo>{data?.regist_date}</Styled.ContentChipTypo>
					</Styled.ContentChip>
				</Styled.ContentChipContainer>

				<Styled.MenuTypo>피드백 요청 이미지</Styled.MenuTypo>
				<Styled.FeedbackImgContainer>
					{data?.thumbnail_list?.map((image_url: string, index: number) => (
						<Styled.FeedbackImg src={image_url} key={`feedback_img_${index}`} />
					))}
				</Styled.FeedbackImgContainer>
				<Styled.RequestSubmitButtonContainer>
					<Styled.RequestSubmitButton
						onClick={() => history.push(`/feedback/feedback/${requestId}`)}
					>
						<Styled.RequestSubmitButtonTypo>
							피드백하기
						</Styled.RequestSubmitButtonTypo>
					</Styled.RequestSubmitButton>
				</Styled.RequestSubmitButtonContainer>
			</Styled.FeedbackContainer>
		</Styled.Root>
	);
};

export default FeedbackDetails;
