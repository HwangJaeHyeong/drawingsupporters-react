import { InputAdornment } from '@material-ui/core';
import { feedbackRequest } from 'api/feedback';
import React, { useRef, useState } from 'react';
import * as Styled from './styled';

const height = 80;
const fontSize = 24;
const InputLabelProps = {
	style: {
		fontFamily: 'Noto Sans Regular',
		height,
		fontSize,
	},
};
const inputProps = {
	style: {
		fontFamily: 'Noto Sans Regular',
		height,
		fontSize,
		padding: '0 24px',
		lineHeight: '250%',
	},
};

const FeedbackRequestPC = () => {
	const [title, setTitle] = useState<string>('');
	const [field, setField] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [desiredPrice, setDesiredPrice] = useState<number>();
	const [endDate, setEndDate] = useState();
	const [details, setDetails] = useState('');
	const [phoneNumber, setPhoneNumber] = useState();
	const [agreement, setAgreement] = useState(false);
	const [imageFile, setImageFile] = useState<any>();

	const imageFileUploadRef = useRef<any>();

	const handleImageFileUpload = (e: any) => {
		setImageFile(e.target.files[0]);
	};

	const onEditorChange = (id: string) => (e: any) => {
		const numberTest = /[^0-9]/g;

		if (id === 'title') {
			setTitle(e.target.value);
		} else if (id === 'field') {
			setField(e.target.value);
		} else if (id === 'type') {
			setType(e.target.value);
		} else if (id === 'desiredPrice') {
			setDesiredPrice(e.target.value.replace(numberTest, ''));
		} else if (id === 'endDate') {
			setEndDate(e.target.value);
		} else if (id === 'details') {
			setDetails(e.target.value);
		} else if (id === 'phoneNumber') {
			setPhoneNumber(e.target.value);
		} else if (id === 'agreement') {
			setAgreement(e.target.checked);
		}
	};

	const onSubmit = () => {
		if (title === '') {
			alert('제목을 입력해주세요!');
		} else if (field === '') {
			alert('피드백 분야를 입력해주세요!');
		} else if (type === '') {
			alert('피드백 유형을 입력해주세요!');
		} else if (!desiredPrice) {
			alert('희망 가격대를 입력해주세요!');
		} else if (!endDate) {
			alert('희망 마감기한을 입력해주세요!');
		} else if (!details) {
			alert('피드백 상세 요구사항을 입력해주세요!');
		} else if (!phoneNumber) {
			alert('연락처를 입력해주세요!');
		} else if (!agreement) {
			alert('사이트 게시에 동의해주세요!');
		} else {
			const formData = new FormData();
			const properties = new FormData();
			// properties.append('title', title);
			// properties.append('description', details);
			// properties.append('price_lower_limit', `${desiredPrice}`);
			// properties.append('price_upper_limit', `${desiredPrice}`);
			// properties.append('feedback_type', JSON.stringify([type]));
			// properties.append('end_time', `${endDate}`);
			// properties.append('phone_number', `${phoneNumber}`);

			const data: any = {
				title,
				description: details,
				price_lower_limit: desiredPrice,
				price_upper_limit: desiredPrice,
				feedback_type: [type],
				end_time: '2021-08-20',
				phone_number: phoneNumber,
				feedback_file_type: 'image',
			};
			formData.append('properties', data);
			formData.append('file', imageFile);
			formData.append('file', imageFile);
			formData.append('file', imageFile);

			feedbackRequest(formData);
		}
	};

	console.log(imageFile);

	return (
		<Styled.Root>
			<Styled.TitleTypo>피드백 요청</Styled.TitleTypo>
			<Styled.RequestContainer>
				<Styled.RequestTitleEditor
					style={{ height }}
					placeholder="그림 제목"
					variant="outlined"
					InputLabelProps={InputLabelProps}
					inputProps={inputProps}
					value={title}
					onChange={onEditorChange('title')}
				/>
				<Styled.RequestDetailInfoWrapper>
					<Styled.RequestEditor
						style={{ height }}
						placeholder="피드백 분야"
						variant="outlined"
						InputLabelProps={InputLabelProps}
						inputProps={inputProps}
						value={field}
						onChange={onEditorChange('field')}
					/>
					<Styled.RequestEditor
						style={{ height }}
						placeholder="피드백 유형"
						variant="outlined"
						InputLabelProps={InputLabelProps}
						inputProps={inputProps}
						value={type}
						onChange={onEditorChange('type')}
					/>
					<Styled.RequestEditor
						style={{ height }}
						placeholder="희망 가격대"
						variant="outlined"
						InputLabelProps={InputLabelProps}
						InputProps={{
							style: {
								fontFamily: 'Noto Sans Regular',
								height,
								fontSize,
								padding: '0 24px 0 12px',
							},
							endAdornment: <InputAdornment position="end">원</InputAdornment>,
						}}
						value={desiredPrice}
						onChange={onEditorChange('desiredPrice')}
					/>
					<Styled.RequestEditor
						style={{ height }}
						placeholder="희망 마감기한"
						variant="outlined"
						InputLabelProps={InputLabelProps}
						inputProps={inputProps}
						value={endDate}
						onChange={onEditorChange('endDate')}
					/>
				</Styled.RequestDetailInfoWrapper>
				<Styled.RequestTitleEditor
					style={{ height: '260px', marginTop: '40px' }}
					placeholder="피드백 상세 요구사항 (최대 200자)"
					variant="outlined"
					InputLabelProps={InputLabelProps}
					inputProps={{
						style: {
							height: 200,
							fontSize,
							padding: '8px 12px',
							lineHeight: '120%',
						},
					}}
					value={details}
					onChange={onEditorChange('details')}
					multiline={true}
				/>
			</Styled.RequestContainer>
			<Styled.RequestImgContainer>
				<input
					type="file"
					name="file"
					onChange={(e) => handleImageFileUpload(e)}
					style={{ display: 'none' }}
					ref={imageFileUploadRef}
				/>
				<Styled.RequestImgButton
					onClick={() => {
						imageFileUploadRef && imageFileUploadRef.current.click();
					}}
				>
					<Styled.RequestImgButtonTypo>
						이미지 업로드
					</Styled.RequestImgButtonTypo>
				</Styled.RequestImgButton>
				<Styled.RequestImgNameWrapper>
					<Styled.RequestImgNameWrapperTypo>
						{imageFile?.name}
					</Styled.RequestImgNameWrapperTypo>
				</Styled.RequestImgNameWrapper>
			</Styled.RequestImgContainer>
			<Styled.RequestPhoneNumberContainer>
				<Styled.RequestEditor
					style={{ height }}
					placeholder="연락처"
					variant="outlined"
					InputLabelProps={InputLabelProps}
					inputProps={inputProps}
					value={phoneNumber}
					onChange={onEditorChange('phoneNumber')}
				/>
			</Styled.RequestPhoneNumberContainer>
			<Styled.RequestAgreeContainer>
				<Styled.ReqeustAgreeCheckbox
					color="primary"
					onClick={onEditorChange('agreement')}
					checked={agreement}
				/>
				<Styled.RequestAgreeTypo>
					사이트 게시에 동의합니다.
				</Styled.RequestAgreeTypo>
			</Styled.RequestAgreeContainer>
			<Styled.RequestSubmitButtonContainer>
				<Styled.RequestSubmitButton onClick={onSubmit}>
					<Styled.RequestSubmitButtonTypo>
						제출하기
					</Styled.RequestSubmitButtonTypo>
				</Styled.RequestSubmitButton>
			</Styled.RequestSubmitButtonContainer>
		</Styled.Root>
	);
};

export default FeedbackRequestPC;
