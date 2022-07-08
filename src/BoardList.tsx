import { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Board = ({
  id,
  title,
  registerId,
  registerDate,
}: {
  id: number;
  title: string;
  registerId: string;
  registerDate: string;
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};
/**
 * BoardList class
 */
class BoardList extends Component {
  state = {
    boardList: [],
  };

  getList = () => {
    axios
      .get("http://localhost:8000/list", {})
      .then((res) => {
        const { data } = res;
        this.setState({
          boardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  /**
   */
  componentDidMount() {
    this.getList();
  }

  render() {
    // eslint-disable-next-line
    const { boardList }: { boardList: any } = this.state;
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>선택</td>
              <td>번호</td>
              <td>제목</td>
              <td>작성자</td>
              <td>작성일</td>
            </tr>
          </thead>
          <tbody>
            {
              // eslint-disable-next-line
              boardList.map((v: any) => {
                return (
                  <Board
                    id={v.BOARD_ID}
                    title={v.BOARD_TITLE}
                    registerId={v.REGISTER_ID}
                    registerDate={v.REGISTER_DATE}
                    key={v.BOARD_ID}
                  />
                );
              })
            }
          </tbody>
        </Table>
        <Button variant="info">글쓰기</Button>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger">삭제하기</Button>
      </div>
    );
  }
}
export default BoardList;
