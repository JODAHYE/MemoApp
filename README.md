## 간단한 메모장 웹사이트
다양한 배경색을 선택하여 메모를 작성할 수 있습니다.
> https://color--it.herokuapp.com/

![image](https://user-images.githubusercontent.com/57217119/169643596-3ed3b30a-4304-40f9-b966-a79611595731.png)


## 사용 기술

프론트
> `React, Redux, Redux-thunk, Styled-components`

백엔드
>  Node.js, Express.js, Mongoose


배포
> 헤로쿠


## 기능
 - 로그인(jsonwebtoken)
 - 메모 작성, 읽기, 수정, 삭제 (CRUD)
 - 카테고리 생성/ 카테고리별로 메모 저장
 - 메모지 색깔별로 글 저장/렌더링

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
