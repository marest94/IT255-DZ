import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Main {

    public Main() {
        try{
            URL url = new URL("https://jsonplaceholder.typicode.com/todos/1");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            if(conn.getResponseCode() != 200){
                throw new RuntimeException ("Pokusaj nije uspeo : HTTP error : " + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String json = "";
            String output;
            while ((output = br.readLine()) != null){
                json += output;
            }
            conn.disconnect();
            Gson gson = new Gson();
            RootObject lista = gson.fromJson(json, RootObject.class);
            System.out.println("ID: " + lista.getId());
            System.out.println("UserID: " + lista.getUserId());
            System.out.println("Title: " + lista.getTitle());
            System.out.println("Completed: " + lista.getCompleted());

        }catch(MalformedURLException e){
            e.printStackTrace();
        }catch (IOException e){
            e.printStackTrace();
        }

    }



    public static void main(String[] args) {
        new Main();
    }

}
