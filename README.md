# Colorit
![image](https://user-images.githubusercontent.com/57217119/169643596-3ed3b30a-4304-40f9-b966-a79611595731.png)



## 서비스 설명

포스트잇처럼 다양한 색깔의 메모지에 메모하는 느낌으로 글을 작성할 수 있는 웹입니다.

색깔별, 폴더별로 글을 저장할 수 있습니다.

<a href="https://color--it.herokuapp.com/">바로가기</a> 



## 🔨 기능 소개
**로그인**
 - 간단한 회원가입과 로그인


**메인**

 - 메모를 작성하고, 읽고, 수정하고, 삭제할 수 있습니다. 


**카테고리(폴더)**

 - 카테고리(폴더)를 생성할 수 있습니다. 
 - 카테고리별로 메모를 저장하고 카테고리별로 메모들을 렌더링할 수 있습니다.

 - 메모지 색깔별로 메모를 저장하고, 메인 페이지 상단의 작은 원 형태의 버튼을 눌러 해당 색깔별로 메모들을 렌더링할 수 있습니다.





## 사용 기술

프론트
`React, Redux, Redux-thunk, Styled-components`

백엔드
`Node.js, Express.js, Mongoose`

## 폴더구조

![image](https://user-images.githubusercontent.com/57217119/169643421-0c4a7c3a-d7f0-471d-8d64-70dadfc81be5.png)

 - components
 > 컴포넌트 파일들을 모아둠
 - hooks
> 공통적으로 사용되는 함수들 분리
 - modules
 > 리덕스 관련 파일을 모아둠
 - style
> 여러 곳에서 사용되는 rgb 색상을 객체로 정의한 파일이 있음
