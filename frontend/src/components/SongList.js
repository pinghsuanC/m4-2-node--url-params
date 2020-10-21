import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SongListItem from "./SongListItem.js";

const SongList = ({ songs }) => {
  return (
    <Div_all>
      {songs.map((ele) => {
        return <SongListItem song={ele} />;
      })}
    </Div_all>
  );
};

const Div_all = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export default SongList;
