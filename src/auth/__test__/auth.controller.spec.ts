import { Test } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";

describe("Auth Controller", () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService]
        }).compile();

        authController = module.get(AuthController);
        authService = module.get(AuthService);
    });

    it("should return access token on login", async () => {
        const email = "user@test.com";
        const password = "password";
        const mockToken = { access_token: "token" };

        const loginSpy = jest.spyOn(authService, "login").mockResolvedValueOnce(mockToken);
        const result = await authController.login({ email, password });

        expect(result).toBe(mockToken);
        expect(loginSpy).toHaveBeenCalledWith(email, password);
    });
});
