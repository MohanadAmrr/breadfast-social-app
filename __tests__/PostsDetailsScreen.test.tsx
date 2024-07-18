import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import axios from "axios";
import PostDetailsScreen from "../src/screens/PostsDetailsScreen";

jest.mock("axios");

const mockPost = {
  id: 1,
  user_id: 1,
  title: "Test Post",
  body: "This is a test post body",
};

const mockUser = {
  id: 1,
  name: "Test User",
};

const mockComments = [
  { id: 1, post_id: 1, name: "Commenter 1", body: "This is comment 1" },
  { id: 2, post_id: 1, name: "Commenter 2", body: "This is comment 2" },
];

const mockRoute = {
  params: {
    post: mockPost,
    user: mockUser,
  },
};

describe("PostDetailsScreen", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockClear();
  });

  it("renders post details and comments", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockComments });

    const { getByText, getAllByTestId } = render(
      <PostDetailsScreen route={mockRoute as any} />
    );

    await waitFor(() => {
      expect(getByText("Test Post")).toBeTruthy();
      expect(getByText("This is a test post body")).toBeTruthy();
      expect(getByText("Test User")).toBeTruthy();
      expect(getAllByTestId("comment-item")).toHaveLength(2);
      expect(getByText("Commenter 1")).toBeTruthy();
      expect(getByText("Commenter 2")).toBeTruthy();
    });
  });

  it("renders no comments message when there are no comments", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    const { getByText } = render(
      <PostDetailsScreen route={mockRoute as any} />
    );

    await waitFor(() => {
      expect(getByText("No comments yet.")).toBeTruthy();
    });
  });
});
