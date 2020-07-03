import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const movie = {
  title: `Тест1`,
  pictureSrc: `test1.jpg`
};

it(`e2e test for MovieCard`, () => {
  const onTitleClick = jest.fn();
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  const result = {
    sentIndex: 5,
    resultIndex: 5
  };

  const movieCard = shallow(
      <MovieCard
        movie = {movie}
        onTitleClick = {onTitleClick}
        onMouseEnter = {() => onMouseEnter(result.sentIndex)}
        onMouseLeave = {onMouseLeave}
      />
  );

  movieCard.find(`.small-movie-card__title`).simulate(`click`);
  expect(onTitleClick).toHaveBeenCalledTimes(1);

  movieCard.find(`.catalog__movies-card`).simulate(`mouseenter`);
  expect(onMouseEnter.mock.calls[0][0]).toBe(result.resultIndex);

  movieCard.find(`.catalog__movies-card`).simulate(`mouseleave`);
  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
