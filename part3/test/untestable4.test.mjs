import { PasswordService, PostgresUserDao } from "../src/testable4.mjs"
import { expect } from "chai"
import argon2 from "@node-rs/argon2"

describe("Untestable 4: enterprise application", () => {
  let service
  let users
  beforeEach(() => {
    service = new PasswordService()
    users = PostgresUserDao.getInstance()
  })

  afterEach(() => {})

  it("password can be changed", async () => {
    const password = argon2.hashSync("salasana")
    users.save([1, password])
    const result = await service.changePassword(1, password, "kalasana")
    expect(result).to.not.equal(password)
  })

  it("giving the same password as old and new does not change the password", async () => {
    const password = argon2.hashSync("salasana")
    users.save([1, password])
    const result = await service.changePassword(1, password, "salasana")
    expect(result).to.equal(password)
  })
})
