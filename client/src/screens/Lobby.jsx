import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div style={{ backgroundColor: "#E0E5EC", padding: "100px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>Video chat</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email" style={{ fontSize: "24px"}}>Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" ,fontSize: "20px"}}
        />
        <br></br>
        <br>
        </br>
        
        <label htmlFor="room" style={{ fontSize: "24px"}}>Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" , fontSize: "20px" }}
        />
        <br></br><br></br>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 30px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "24px",
          }}
          
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;
