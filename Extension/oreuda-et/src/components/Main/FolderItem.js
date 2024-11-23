import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";

import st from "./FolderList.module.scss";
import folderSt from "./Folder.module.scss";

const FolderItem = ({ folder, id, order, focusIdx, SetFocusIdx, moveFolder }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type: "folder",
      item: { id, order },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, order, moveFolder]
  );

  const [, dropLeft] = useDrop(
    () => ({
      accept: "folder",
      drop({ id: draggedId, order: orgIndex }) {
        if (draggedId !== id && orgIndex !== (order - 1)) {
          moveFolder(draggedId, order - 1);
        }
      },
    }),
    [moveFolder]
  );

  const [, dropRight] = useDrop(
    () => ({
      accept: "folder",
      drop({ id: draggedId, order: orgIndex }) {
        if (draggedId !== id && orgIndex !== order) {
          moveFolder(draggedId, order);
        }
      },
    }),
    [moveFolder]
  );

  const doubleClick = (key) => {
    console.log(key.id);
    navigate(`/folder/${key.id}`, { state: { color: key.color, name: key.name } });
  };

  const focusHandler = () => {
    if (isFocused && folder.order === focusIdx) {
      setIsFocused(false);
      SetFocusIdx(-1);
    } else {
      setIsFocused(true);
      SetFocusIdx(folder.order);
    }
  };

  return (
    <div className={folderSt.layout}>
      <div className={folderSt.leftRef} ref={dropLeft}>&nbsp;</div>
      <div
        ref={previewRef}
        onDoubleClick={() => doubleClick(folder)}
        onClick={() => focusHandler()}
        className={`${isFocused && focusIdx === folder.order
          ? folderSt.focused
          : folderSt.unFocused
          } ${folderSt.folderItem}`}
      >
        <div className={folderSt.blink}>&nbsp;</div>
        <div className={st.folderDiv}>
          <img
            ref={dragRef}
            title={`${folder.name} 폴더 - 드래그하여 순서 변경`}
            className={st.folderImg}
            src={`/assets/folders/${folder.color}.svg`}
          ></img>
        </div>
        <div className={st.folderTitle}>{folder.name}</div>
      </div>
      <div className={folderSt.rightRef} ref={dropRight}>&nbsp;</div>
    </div>
  );
};

export default FolderItem;
