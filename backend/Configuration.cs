using dotenv.net;

namespace backend
{
    public static class Configuration
    {
        private static readonly IDictionary<string, string> VARS;

        static Configuration()
        {
            DotEnv.Load();
            VARS = DotEnv.Read();
        }

        public static string GetEnvVar(string name)
        {
            return VARS[name]
                ?? Environment.GetEnvironmentVariable(name)
                ?? throw new Exception($"Set environment variable {name}.");
        }
    }
}