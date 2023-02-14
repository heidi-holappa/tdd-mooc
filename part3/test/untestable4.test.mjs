import { PasswordService, PostgresUserDao } from "../src/testable4.mjs"
import { expect } from "chai"
import argon2 from "@node-rs/argon2"

describe("Untestable 4: enterprise application", () => {
  let service
  let dao
  beforeEach(() => {
    service = new PasswordService()
    dao = new PostgresUserDao()
  })

  afterEach(() => {
    PostgresUserDao.getInstance().close()
  })

  xit("todo", async () => {
    // TODO: write proper tests
  })

  it("password can be changed", async () => {
    const password = argon2.hashSync("salasana")
    dao.save([1, password])
    const result = service.changePassword(1, "salasana", "salasana")
    expect(result).to.not.equal(password)
  })
})
