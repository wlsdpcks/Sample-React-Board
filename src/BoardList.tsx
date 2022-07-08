import { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Board = ({
  id,
  title,
  registerId,
  registerDate,
  props, // Board메서드에서 컴포넌트 state값을 관리하기 위해서 props를 추가
}: {
  id: number;
  title: string;
  registerId: string;
  registerDate: string;
  props: any; // Board메서드에서 컴포넌트 state값을 관리하기 위해서 props를 추가
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={id}
          onChange={(e) => {
            props.onCheckboxChange(
              e.currentTarget.checked,
              e.currentTarget.value
            );
          }}
        ></input>
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};
interface IProps {
  isComplete: boolean;
  handleModify: any;
  renderComplete: any;
}
/**
 * BoardList class
 */
class BoardList extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      boardList: [],
      checkList: [],
    };
  }

  state = {
    boardList: [],
    checkList: [],
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
  // eslint-disable-next-line
  onCheckboxChange = (checked: boolean, id: any) => {
    const list: Array<string> = this.state.checkList.filter((v) => {
      return v != id;
    });

    if (checked) {
      list.push(id);
    }

    this.setState({
      checkList: list,
    });
  };

  handleDelete = () => {
    if (this.state.checkList.length == 0) {
      alert("삭제할 게시글을 선택하세요.");
      return;
    }
    let boardIdList = "";
    this.state.checkList.forEach((v: any) => {
      boardIdList += `'${v}',`;
    });
    axios
      .post("http://localhost:8000/delete", {
        boardIdList: boardIdList.substring(0, boardIdList.length - 1),
      })
      .then(() => {
        this.getList();
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
                    props={this}
                  />
                );
              })
            }
          </tbody>
        </Table>
        <Button variant="info">글쓰기</Button>
        <Button
          variant="secondary"
          onClick={() => {
            this.props.handleModify(this.state.checkList);
          }}
        >
          수정하기
        </Button>
        <Button variant="danger" onClick={this.handleDelete}>
          삭제하기
        </Button>
      </div>
    );
  }
}
export default BoardList;
