import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
const { KEYVAULT_URL, ENV_KEY } = process.env;

try {
  const credential = new DefaultAzureCredential();

  if (!KEYVAULT_URL || !ENV_KEY)
    throw new Error("Required Key Vault Variables Missing");

  const client = new SecretClient(KEYVAULT_URL, credential);

  const secret = await client.getSecret(ENV_KEY);
  const secretValue = secret.value;

  if (!secretValue) throw new Error("Value Not Found");
  const parsedSecretValue = JSON.parse(secretValue);
  process.env = { ...process.env, ...parsedSecretValue };
} catch (e) {
  console.log(e);
}
