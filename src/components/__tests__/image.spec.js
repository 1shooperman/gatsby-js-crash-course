import React from "react"
import renderer from "react-test-renderer"

import * as gatsby from "gatsby"

import Image from "../image"
import jestConfig from "../../../jest.config"

describe("Image", () => {
  it("renders correctly", () => {
    const orig = gatsby.useStaticQuery
    gatsby.useStaticQuery = jest.fn(() => ({
      placeholderImage: {
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            src: "string",
            srcSet: "string",
            sizes: "string"
          },
        },
      },
    }))
    const tree = renderer.create(<Image />).toJSON()
    gatsby.useStaticQuery = orig

    expect(tree).toMatchSnapshot()
  })

  it("prints picture not found", () => {
    const orig = gatsby.useStaticQuery
    gatsby.useStaticQuery = jest.fn(() => {})
    const {
      children: [first],
    } = renderer.create(<Image />).toJSON()
    gatsby.useStaticQuery = orig

    expect(first).toEqual("Picture not found")
  })
})
