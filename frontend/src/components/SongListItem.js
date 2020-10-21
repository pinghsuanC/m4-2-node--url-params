import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SongListItem = ({ song }) => {
  const { rank, title, artist, streams, publicationDate } = song;
  return (
    <Div_inner>
      {/* rank and stream */}
      <Div_rank>
        #{rank}
        <Div_stream>({streams} streams)</Div_stream>
      </Div_rank>
      {/* title and artist */}
      <Div_title>
        {title}
        <Div_artist>by {artist}</Div_artist>
      </Div_title>
      {/*publication date*/}
      <Div_publicationDate>
        publication date: {publicationDate}
      </Div_publicationDate>
    </Div_inner>
  );
};

const Div_inner = styled.div`
  width: 95%;
  height: 120px;
  border-bottom: 1px solid gray;
  padding: 10px;
  font-family: "Roboto Slab, serif";
  position: relative;
`;

const Div_rank = styled.div`
  position: absolute;
  width: auto;
  font-size: 3em;
  align-self: center;
  left: 30px;
  top: 25%;
`;
const Div_stream = styled.div`
  padding-top: 5px;
  font-size: 0.25em;
  color: gray;
`;
const Div_title = styled.div`
  position: absolute;
  font-size: 1.5em;
  left: 150px;
  top: 15%;
`;
const Div_artist = styled.div`
  padding-top: 5px;
  font-size: 0.8em;
  font-style: italic;
  color: gray;
`;
const Div_publicationDate = styled.div`
  position: absolute;
  font-size: 0.7em;
  color: gray;
  right: 0%;
  bottom: 10px;
`;
export default SongListItem;
