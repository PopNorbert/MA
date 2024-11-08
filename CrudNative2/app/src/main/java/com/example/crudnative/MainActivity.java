package com.example.crudnative;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.Date;

public class MainActivity extends AppCompatActivity {
    private ListView contestListView;
    private ContestAdapter contestAdapter;
    private ArrayList<Contest> contestList;
    private Button createContestButton;

    
    public final ActivityResultLauncher<Intent> editContestResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            new ActivityResultCallback<androidx.activity.result.ActivityResult>() {
                @Override
                public void onActivityResult(androidx.activity.result.ActivityResult result) {
                    if (result.getResultCode() == RESULT_OK) {
                        
                        Contest updatedContest = (Contest) result.getData().getSerializableExtra("updatedContest");

                        
                        for (int i = 0; i < contestList.size(); i++) {
                            if (contestList.get(i).getId().equals(updatedContest.getId())) {
                                contestList.set(i, updatedContest);
                                contestAdapter.notifyDataSetChanged();
                                break;
                            }
                        }

                        Toast.makeText(MainActivity.this, "Contest updated", Toast.LENGTH_SHORT).show();
                    }
                }
            }
    );
    private final ActivityResultLauncher<Intent> createContestLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    Contest newContest = (Contest) result.getData().getSerializableExtra("newContest");
                    if (newContest != null) {
                        
                        contestList.add(newContest);
                        contestAdapter.notifyDataSetChanged();
                    }
                }
            }
    );

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        contestListView = findViewById(R.id.contestListView);

        contestList = new ArrayList<>();
        contestList.add(new Contest("1", "Turneu 1", Category.OPEN, "Cluj", new Date()));
        contestList.add(new Contest("2", "Turneu 2", Category.AVANSATI, "Dej", new Date()));

        createContestButton = findViewById(R.id.createContestButton);
        contestAdapter = new ContestAdapter(this, contestList, editContestResultLauncher);
        contestListView.setAdapter(contestAdapter);
        createContestButton.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, CreateContestActivity.class);
            createContestLauncher.launch(intent);
        });
    }
}
