import { Space, Spin } from "antd";
import { styled } from "styled-components";

interface ILoading {
  size: string;
  type?: string;
}
export const Loading = ({ size, type = "Loading" }: ILoading) => {
  const Wrapped = styled.div`
    .ant-space-item {
      display: inline-flex;
      justify-content: center;
    }
  `;
  const sizeToString = (size: string) => {
    switch (size) {
      case "small":
        return "small";
      case "large":
        return "large";
      default:
    }
  };
  return (
    <Wrapped>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Spin tip={type} size={sizeToString(size)} />
      </Space>
    </Wrapped>
  );
};
