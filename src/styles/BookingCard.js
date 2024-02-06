import styled from "styled-components";

const BookingCard = styled.div`
  background-color: #dadada;
  padding: 4% 0;
  border-radius: 8px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2%;

  &:hover {
    scale: 1.02;
    background-color: #dadada;
  }

  img {
    width: 100%;
  }
`;

export default BookingCard;
